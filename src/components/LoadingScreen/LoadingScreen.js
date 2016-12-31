export default class LoadingScreen {
  static closeLoadingScreen() {
    const body = window.document.getElementsByTagName('body')[0];
    body.className = 'loaded';
  }
}
