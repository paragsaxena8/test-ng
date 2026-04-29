import { Directive } from '@angular/core';
import { BrnSheetClose } from '@spartan-ng/brain/sheet';

@Directive({
	selector: 'button[hlmSheetClose]',
	hostDirectives: [{ directive: BrnSheetClose, inputs: ['delay'] }],
	host: {
		'data-slot': 'sheet-close',
	},
	standalone: true,
})
export class HlmSheetClose {}
