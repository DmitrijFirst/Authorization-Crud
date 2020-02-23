import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';
import { of } from 'rxjs';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EmpInfoComponent } from 'src/app/share/modal_components/emp-info/emp-info.component';

describe('ModalService', () => {
  let modalService: ModalService;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' }; //добовляем экземпляр объекту шпиону
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatDialogModule],
    providers: [ModalService, MatDialog],
   
  }));
  modalService = TestBed.get(ModalService);
  beforeEach(() => {
    dialogSpy = spyOn(TestBed.get(MatDialog), 'openEmpInfo').and.returnValue(dialogRefSpyObj);
});

  it('should be created', () => {
    const service: ModalService = TestBed.get(ModalService);
    expect(service).toBeTruthy();
  });
/*
  it('open modal ', () => {
    modalService.openEmpInfo();
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalledWith(EmpInfoComponent, { maxWidth: '25%' });
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
});
*/
});
