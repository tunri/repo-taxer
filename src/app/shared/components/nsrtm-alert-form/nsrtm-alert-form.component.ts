import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nsrtm-alert-form',
  templateUrl: './nsrtm-alert-form.component.html',
  styleUrls: ['./nsrtm-alert-form.component.scss']
})
export class NsrtmAlertFormComponent implements OnInit {
 /**
	 * Declaración de variables
	*/
	@Input() message: string | undefined = 'Error';
  @Input() type: string | undefined = 'danger';
  
  constructor() { }

  ngOnInit(): void {
  }

}
