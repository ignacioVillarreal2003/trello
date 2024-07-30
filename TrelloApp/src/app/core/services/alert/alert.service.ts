import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  ErrorMessage(text: string){
    Swal.fire({
      title: text,
      icon: 'error',
      confirmButtonText: 'Cool',
      timer: 3000,
      timerProgressBar: true
    })
  }

  SuccessMessage(text: string){
    Swal.fire({
      title: text,
      icon: 'success',
      confirmButtonText: 'Cool',
      timer: 3000,
      timerProgressBar: true
    })
  }

  async PreConfirm(title: string): Promise<boolean> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    const result = await swalWithBootstrapButtons.fire({
      title: title,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    });
    if (result.isConfirmed) {
      return true;
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await swalWithBootstrapButtons.fire({
        title: "Cancelled",
        icon: "error"
      });
      return false;
    }
    return false;
  }
}
