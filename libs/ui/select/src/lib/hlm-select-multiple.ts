import { Directive } from '@angular/core';
import { provideBrnDialogDefaultOptions } from '@spartan-ng/brain/dialog';
import { BrnPopover, provideBrnPopoverConfig } from '@spartan-ng/brain/popover';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
	selector: '[hlmSelectMultiple],hlm-select-multiple',
	providers: [
		provideBrnPopoverConfig({
			align: 'start',
			sideOffset: 6,
		}),
		provideBrnDialogDefaultOptions({
			autoFocus: 'first-heading',
		}),
	],
	hostDirectives: [
		{
			directive: BrnPopover,
			inputs: [
				'align',
				'autoFocus',
				'closeDelay',
				'closeOnOutsidePointerEvents',
				'sideOffset',
				'state',
				'offsetX',
				'restoreFocus',
			],
			outputs: ['stateChanged', 'closed'],
		},
	],
	host: {
		'data-slot': 'select',
	},
})
export class HlmSelectMultiple {
	constructor() {
		classes(() => 'block');
	}
}