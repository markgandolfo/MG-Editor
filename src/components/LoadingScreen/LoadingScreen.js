export default class LoadingScreen {
  static close() {
    const body = window.document.getElementsByTagName('body')[0];
    body.className = 'loaded';
  }
}
