export class DataNotFoundException extends Error {
  constructor(private response: string) {
    super();
    this.initMessage();
  }

  public initMessage(): void {
    if (this.response) {
      this.message = this.response;
    }
  }
}
