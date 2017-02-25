import _ from 'lodash';
import Dexie from 'dexie';
import db from 'repositories/DexieBase';

export default class ConfigRepository {
  constructor({ id = null, type = '', configuration = {} }) {
    this.id = id;
    this.type = type;
    this.configuration = configuration;
  }

  static get(id) {
    Dexie.spawn(function* () {
      yield db.config.where('id').eq(id);
    });
  }

  static getByType(type, successCallback) {
    Dexie.spawn(function* () {
      const config = yield db.config.where('type').equals(type).toArray();
      successCallback(config);
    });
  }

  static all(callback) {
    Dexie.spawn(function* () {
      let config = yield db.config.toArray();

      config = _.map(config, (configItem) => { // eslint-disable-line arrow-body-style
        return {
          id: configItem.id,
          type: configItem.type,
          configuration: configItem.configuration
        };
      });

      // always return first
      return callback(config);
    });
  }

  static delete(noteId, successCallback, errorCallback) {
    Dexie.spawn(function* () {
      yield db.config.delete(noteId);
      return successCallback();
    }).catch((err) => {
      console.error(`eek, delete went wrong: ${err}`); // eslint-disable-line no-console
    });
    if (errorCallback !== undefined) {
      return errorCallback();
    }
    return null;
  }

  // DB Methods
  save() {
    if (this.id === null) {
      this._create();
    } else {
      this._update();
    }

    return this;
  }

  _create() {
    const _this = this;

    Dexie.spawn(function* () {
      delete _this.id;
      _this.id = yield db.config.put(_this);
    }).catch((err) => {
      console.error(`eek create went wrong: ${err}`); // eslint-disable-line no-console
    });
  }

  _update() {
    const _this = this;

    Dexie.spawn(function* () {
      yield db.config.update(_this.id, _this._asJson());
    }).catch((err) => {
      console.error(`eek update went wrong: ${err}`); // eslint-disable-line no-console
    });
  }

  _asJson() {
    return {
      id: this.id,
      type: this.type,
      configuration: this.configuration
    };
  }
}
