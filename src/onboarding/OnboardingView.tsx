import { Composite, Properties, TabFolder, WidgetCollection } from 'tabris';
import { Listeners, getById, ComponentJSX, component } from 'tabris-decorators';
import NavigationBar from './NavigationBar';
import DevConsoleTab from './DevConsoleTab';
import OnboardingTab from './OnboardingTab';
import WelcomeTab from './WelcomeTab';
import Divider from '../widget/Divider';
import analytics from '../analytics';
import color from '../res/color';
import dimen from '../res/dimen';

@component export default class OnboardingView extends Composite {

  public jsxProperties: ComponentJSX<this>;
  public onComplete: Listeners<{ target: OnboardingView }> = new Listeners(this, 'complete');
  @getById private tabFolder: TabFolder;
  @getById private navBar: NavigationBar;
  private tabs: WidgetCollection<OnboardingTab> = (
    <widgetCollection>
      <WelcomeTab selectionIndex={0} />
      <DevConsoleTab selectionIndex={1} />
    </widgetCollection>);

  constructor(properties?: Properties<Composite>) {
    super({ background: color.background, ...properties });
    this.createUi();
  }

  private createUi() {
    this.append(
      <widgetCollection>
        <tabFolder
          id='tabFolder'
          left={0} top={0} right={0} bottom={dimen.n}
          tabBarLocation='hidden'
          paging={true}
          onSelectionChanged={({ value: selection }) => this.tabSelectionChanged(selection as OnboardingTab)}>
          {this.tabs}
        </tabFolder>
        <NavigationBar
          id='navBar'
          left={0} right={0} bottom={0} height={dimen.xxl}
          entries={this.tabs.length}
          onSkipButton={() => this.skipOnboarding()}
          onNextButton={() => this.showNextTab()} />
        <Divider left={0} right={0} bottom={0} background={color.onBackgroundDivider} />
      </widgetCollection>
    );
  }

  private skipOnboarding() {
    analytics.logOnboardingSkipped(this.tabFolder.selection.id);
    this.onComplete.trigger();
  }

  private showNextTab() {
    const selectionIndex = (this.tabFolder.selection as OnboardingTab).selectionIndex;
    if (selectionIndex < this.tabs.length - 1) {
      this.tabFolder.selection = this.tabs.toArray()[selectionIndex + 1];
    } else {
      analytics.logOnboardingCompleted();
      this.onComplete.trigger();
    }
  }

  private tabSelectionChanged(selection: OnboardingTab) {
    analytics.screenName = selection.id;
    this.navBar.activeEntry = selection.selectionIndex;
  }

}
