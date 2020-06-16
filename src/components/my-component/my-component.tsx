import {Component, Host, h, State, Prop} from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {

  @State()
  private dogs: string[] | undefined;

  @Prop()
  count: number = 3;

  async componentWillLoad() {
    await this.load();
  }

  private async load() {
    try {
      this.dogs = await this.loadDoggos();
    } catch (err) {
      console.error(err);
    }
  }

  private async loadDoggos(): Promise<string[] | undefined> {
    const rawResponse: Response = await fetch(`https://dog.ceo/api/breed/hound/images/random/${this.count}`);

    if (!rawResponse || !rawResponse.ok) {
      console.error('What the heck');
      return undefined;
    }

    const result = await rawResponse.json();
    return result.message;
  }

  render() {
    return <Host>
      {this.renderDog()}
    </Host>;
  }

  private renderDog() {
    if (!this.dogs) {
      return undefined;
    }

    return this.dogs.map((dog, i) => {
      return <img key={i} src={dog}/>
    })
  }
}
