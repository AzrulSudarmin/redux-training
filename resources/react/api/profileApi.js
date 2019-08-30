import Api from './api';

class Profile extends Api {
  constructor() {
    super('/rest/profile');
  }
}

export default new Profile;
