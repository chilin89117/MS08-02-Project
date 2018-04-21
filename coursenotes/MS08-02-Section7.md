### Lecture 89: The Error Component
* Add `err.component.*`, `err.model.ts`, and `err.service.ts`
* Add `<my-err>` selector to `app.component.html` so it's always available
* Add component to `app.module.ts`

### Lecture 90: The Error Service
* `err.service.ts`
```javascript
export class ErrService {
  errOccurred = new EventEmitter<Error>();
  handleErr(err: any) {
    const errData = new Error(err.status, err.error.message);
    this.errOccurred.emit(errData);
  }
}
```
* Add service as a provider in `app.module.ts`

### Lecture 91: Using an Error Service and Passing Data
* When `msg.service.ts` or `auth.service.ts` catches error, `handleErr()` in `err.service.ts` is called with the error as the argument
* `handleErr()` emits an event that error has occurred
* `err.component.ts` subscribes to this event, captures the error data, and changes the modal display `err.component.html` from `none` to `block`
