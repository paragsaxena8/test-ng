import { Directive } from '@angular/core';
import { BrnSheetContent } from '@spartan-ng/brain/sheet';

@Directive({
	selector: '[hlmSheetPortal]',
	hostDirectives: [{ directive: BrnSheetContent, inputs: ['context', 'class'] }],
	standalone: true,
})
export class HlmSheetPortal {}
