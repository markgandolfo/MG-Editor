import ConfigRepository from 'repositories/ConfigRepository';

export default class Config extends ConfigRepository {
  constructor({ id = null, type = '', configuration = {} }) {
    super({ id, type, configuration });

    this.id = id;
    this.type = type;
    this.configuration = configuration;
  }
}
