export class MusicQueue {
  private queue: any[] = [];

  public add(track: any) {
    this.queue.push(track);
  }

  public get next() {
    return this.queue.shift();
  }

  public get size() {
    return this.queue.length;
  }
}
