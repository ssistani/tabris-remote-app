import { ActivityIndicator, ui } from 'tabris';
import { BasicLauncher } from 'tabris-js-remote';
import { autostart, url, id, version, debug } from './launchConfig';
import UILauncher from './UILauncher';

if (autostart) {
  let activityIndicator = new ActivityIndicator({
    centerX: 0, centerY: 0
  }).appendTo(ui.contentView);
  let launcher = new BasicLauncher();
  launcher.start({ url, id, version, debug });
  launcher.rap.connection.once('received', () => activityIndicator.dispose());
} else {
  new UILauncher();
}
