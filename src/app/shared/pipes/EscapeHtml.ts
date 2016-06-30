import { PipeTransform, Pipe } from "@angular/core";
/**
 * Created by carathorys on 6/30/16.
 */
@Pipe({
  name: 'escapeHtml',
  pure: false
})
export class EscapeHtmlPipe implements PipeTransform {
  transform(value: any, args: any[] = []) {
    return value;
  }
}
