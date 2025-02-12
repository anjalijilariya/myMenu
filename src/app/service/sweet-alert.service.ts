import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor(private router: Router) { }

  warningAlert(title: string, text: string) {
    swal({
      title: title,
      text: text,
      icon: 'warning',
      buttons: {
        confirm: {
          text: "Okay",
          className: "ok"
        }
      },
      dangerMode: false,
    });
  }

  deleteWarningAlert(title: string, text: string, callback: any) {
    swal({
      title: title,
      text: text,
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        callback();
      }
    });
  }

  successAlert(title: string, text: string) {
    swal({
      title: title,
      text: text,
      icon: "success",
      buttons: {
        confirm: {
          text: "Okay",
          className: "ok"
        }
      },
      dangerMode: false,
    });
  }


  errorAlert(title: string, text: string) {
    swal({
      title: title,
      text: text,
      icon: "error",
      buttons: {
        confirm: {
          text: "Okay",
          className: "ok"
        }
      },
      dangerMode: false,
    });
  }
}
