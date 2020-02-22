module.exports = {
  /*
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-3'
  },
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'fastfeet',
  */
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet',
  define: {
    timestamps: true,
    underscored: true,
    underscoreAll: true,
  },
};
