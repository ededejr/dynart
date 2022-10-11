import { makeGenericId } from '@ededejr/utils';

export class Ticker {
  interval: number;
  timer: NodeJS.Timeout;
  executors: Map<string, () => void> = new Map();
  isPlaying = false;

  constructor(interval: number) {
    this.interval = interval;
    this.timer = this.refresh();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  addExecutor(executor: () => void) {
    const id = makeGenericId(12);
    this.executors.set(id, executor);
    return id;
  }

  removeExecutor(executorId: string) {
    this.executors.delete(executorId);
  }

  private refresh() {
    this.executors.forEach((executor) => executor());
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.refresh(), this.interval);
    this.isPlaying = true;
    return this.timer;
  }

  private pause() {
    clearTimeout(this.timer);
    this.isPlaying = false;
  }

  private play() {
    this.refresh();
  }
}