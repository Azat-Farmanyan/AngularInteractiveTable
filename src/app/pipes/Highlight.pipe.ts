import { Pipe, type PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, searchTerm: string): SafeHtml {
    if (value == null || searchTerm == null) return value;

    let valueString: string;

    value = String(value);

    if (typeof value === 'object') {
      valueString = JSON.stringify(value);
    } else {
      valueString = String(value);
    }

    const searchLower = searchTerm.trim().toLowerCase();
    const valueLower = valueString.toLowerCase();

    const index = valueLower.indexOf(searchLower);
    if (index > -1) {
      const beforeMatch = valueString.substr(0, index);
      const match = valueString.substr(index, searchTerm.length);
      const afterMatch = valueString.substr(index + searchTerm.length);

      return this.sanitizer.bypassSecurityTrustHtml(
        `${beforeMatch}<mark>${match}</mark>${afterMatch}`
      );
    }

    return valueString;
  }
}
