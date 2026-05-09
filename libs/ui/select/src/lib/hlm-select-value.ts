import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BrnSelectValue } from '@spartan-ng/brain/select';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'hlm-select-value',
	imports: [BrnSelectValue],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<brn-select-value data-slot="select-value">
			<ng-content />
		</brn-select-value>
	`,
})
export class HlmSelectValue {
	constructor() {
		classes(() => 'data-hidden:hidden');
	}
}