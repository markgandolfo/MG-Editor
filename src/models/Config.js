import ConfigRepository from 'repositories/ConfigRepository';

export default class Config extends ConfigRepository {
  constructor({ id = null, type = '', configuration = {} }) {
    super({ id, type, configuration });

    this.id = id;
    this.type = type;
    this.configuration = configuration;
  }

  static getByType(type, successCallback) {
    super.getByType(type, (configArray) => {
      if (configArray.length > 0) {
        const newConfigArray = configArray.map(function (config) {
          return new Config(config);
        });

        successCallback(newConfigArray);
      }
      successCallback([]);
    });
  }
}
