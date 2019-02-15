// import { ApiMessageService, WebApiMethod, GuiMessage } from '@dms-modules/shared/services/api-message.service';
// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { DictionariesService, IncidentsService, PersonalDatasetsService } from '@dms-rest-api/api/api';
// import { IncidentStatus, IncidentParam, PeopleCategory, PersonalDataset } from '@dms-modules/rest-api';
// import { ActivatedRoute, Router } from '@angular/router';
// import { MatDialog } from '@angular/material';
// import { ConfirmDialogComponent } from '@dms-modules/shared/components/confirm-dialog/confirm-dialog.component';
// import * as moment from 'moment';
// import { forkJoin, of} from 'rxjs';
// import { dateLessThan } from '@dms-modules/shared/validation-dates';

// @Component({
//   selector: 'dms-incidents-detail',
//   templateUrl: './incidents-detail.component.html',
//   styleUrls: ['./incidents-detail.component.scss']
// })
// export class IncidentsDetailComponent implements OnInit {

//   private inId: number;
//   private registryId: number;
//   public formMode: string;
//   public form: FormGroup;
//   public incidentStatuses: IncidentStatus[];
//   public peopleCategories: PeopleCategory[];
//   public personalDatasets: PersonalDataset[];

//   notificationDateMin = moment();
//   incidentDateMax = moment();
//   integerMaxValue = 2147483647;

//   constructor(
//     private dictionariesService: DictionariesService,
//     private incidentsService: IncidentsService,
//     private personalDatasetsService: PersonalDatasetsService,
//     private route: ActivatedRoute,
//     fb: FormBuilder,
//     private router: Router,
//     public dialog: MatDialog,
//     private apiMessageService: ApiMessageService
//   ) {
//     this.formMode = route.snapshot.data['mode'];
//     this.inId = +this.route.snapshot.paramMap.get('id');
//     this.registryId = +route.snapshot.parent.paramMap.get('id');

//     this.form = fb.group({
//       registryId: [this.registryId],
//       description: [null, [Validators.required]],
//       declarant: [null, [Validators.required]],
//       incidentDate: [moment().startOf('day'), [Validators.required]],
//       statusId: [null, [Validators.required]],
//       peopleCategoryIds: [null],
//       personalDatasetIds: [null],
//       systemName: [null],
//       place: [null],
//       circumstances: [null],
//       nature: [null],
//       peopleCount: [null, [Validators.min(1), Validators.max(this.integerMaxValue)]],
//       entriesCount: [null, [Validators.min(1), Validators.max(this.integerMaxValue)]],
//       possibleConsequences: [null],
//       appliedSecurityMeasures: [null],
//       proposedSecurityMeasures: [null],
//       actions: [null],
//       notifications: [null],
//       notes: [null],
//       attachments: [null],
//       technicalDescription: [null],
//       notificationDate: [moment().startOf('day')],
//       culprit: [null],
//       evidences: [null],
//       dataSteward: [null]
//     }, {validator: dateLessThan('incidentDate', 'notificationDate')});

//     if (this.formMode==='view') {
//       this.form.disable();
//     }
//   }

//   ngOnInit() {
//     this.apiMessageService.tapMessage(
//       WebApiMethod.GetIncident,
//       forkJoin(
//         this.dictionariesService.getIncidentStatuses(),
//         this.dictionariesService.getPeopleCategories(),
//         this.personalDatasetsService.getPersonalDatasets(),
//         (this.formMode==='view'||this.formMode==='edit') ? this.incidentsService.getIncident(this.inId) : of(null)
//       )
//     ).subscribe(
//       ([pIncidentStatuses, pPeopleCategories, pPersonalDatasets, incident]) => {
//         this.incidentStatuses = pIncidentStatuses;
//         this.peopleCategories = pPeopleCategories;
//         this.personalDatasets = pPersonalDatasets;

//         if(incident){
//           this.form.patchValue(incident);
//           this.form.patchValue({
//             statusId: incident.status.id,
//             peopleCategoryIds: incident.peopleCategories.map(pc => pc.id),
//             personalDatasetIds: incident.personalDatasets.map(pd => pd.id)
//           });
//           this.notificationDateMin = incident.incidentDate;
//         }
//     });
//   }

//   navBack() {
//     if (this.formMode === 'new') {
//       this.router.navigate(['../list'], { relativeTo: this.route });
//     }
//     if (this.formMode === 'edit' || this.formMode === 'view') {
//       this.router.navigate(['../../list'], { relativeTo: this.route })
//     }
//   }
//   saveIncident() {
//     let dialogHeader: string;
//     if (this.formMode==='new') {
//       dialogHeader = GuiMessage.IncidentsNewIncidentConfirm;
//     } else if (this.formMode==='edit') {
//       dialogHeader = GuiMessage.IncidentsUpdateIncidentConfirm;
//     }

//     let dialogRef = this.dialog.open(ConfirmDialogComponent, {
//       width: '400px',
//       data: { dialogHeader: dialogHeader }
//     });

//     dialogRef.afterClosed().subscribe(dialogOK => {
//       if (dialogOK===true) {
//         const inParam: IncidentParam = this.form.value;

//         if (this.formMode==='new') {
//           this.apiMessageService.tapMessage(
//             WebApiMethod.AddIncident,
//             this.incidentsService.addIncident(inParam)
//           ).subscribe(
//             result => {
//               this.navBack();
//           });
//         } else if (this.formMode==='edit') {
//           this.apiMessageService.tapMessage(
//             WebApiMethod.UpdateIncident,
//             this.incidentsService.updateIncident(this.inId, inParam)
//           ).subscribe(
//             result => {
//               this.navBack();
//           });
//         }
//       }
//     });
//   }

//   incidentDateChange(){
//     const lIncidentDate = this.form.get('incidentDate').value;
//     this.notificationDateMin = lIncidentDate;
//   }

// }
