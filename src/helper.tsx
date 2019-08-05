import { device, ui } from 'tabris';
import dimen from './res/dimen';

export const ICON_PLATFORM = 'images/' + device.platform.toLowerCase();

export const isAndroid = () => device.platform === 'Android';
export const isIos = () => device.platform === 'iOS';

export const statusBarOffset = () => isIos() ? 0 : ui.statusBar.height;
export const contentTopOffset = () => statusBarOffset() + dimen.urlBarHeight + dimen.urlBarTop;
