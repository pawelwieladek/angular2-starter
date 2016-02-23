import { Component, View } from 'angular2/core';
import { COMMON_DIRECTIVES, FORM_DIRECTIVES, ControlGroup, FormBuilder, Validators, Control } from 'angular2/common';

@Component({
    selector: 'order-form',
    directives: [COMMON_DIRECTIVES, FORM_DIRECTIVES],
    template: `
    <form class="form-horizontal" [ngFormModel]="orderForm" (submit)="submit()">
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="form-group">
                    <label for="title" class="col-sm-2">First name</label>
                    <div class="col-sm-10">
                        <input type="text" name="title" class="form-control" [ngControl]="'firstName'" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="title" class="col-sm-2">Last name</label>
                    <div class="col-sm-10">
                        <input type="text" name="title" class="form-control" [ngControl]="'lastName'" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="title" class="col-sm-2">E-mail</label>
                    <div class="col-sm-10">
                        <input type="email" name="title" class="form-control" [ngControl]="'email'" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="title" class="col-sm-2">Product name</label>
                    <div class="col-sm-10">
                        <input type="text" name="title" class="form-control" [ngControl]="'productName'" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="title" class="col-sm-2">Quantity</label>
                    <div class="col-sm-10">
                        <input type="number" name="title" class="form-control" [ngControl]="'quantity'" />
                    </div>
                </div>
            </div>
            <div class="panel-footer">
                <button
                    [ngClass]="{ 'btn': true, 'btn-success': orderForm.valid, 'btn-danger': !orderForm.valid }"
                    [disabled]="!orderForm.valid">
                    Add
                </button>
            </div>
        </div>
    </form>
  `
})
export class OrderFormComponent {
    public orderForm: ControlGroup;

    constructor (private formBuilder: FormBuilder) {
        this.orderForm = formBuilder.group({
            firstName: formBuilder.control('', Validators.required),
            lastName: formBuilder.control('', Validators.required),
            email: formBuilder.control('', Validators.compose([ Validators.required, this.validateEmail ])),
            productName: formBuilder.control('', Validators.required),
            quantity: formBuilder.control(0, Validators.required)
        });
    }

    submit() {
        let { firstName, lastName, email, productName, quantity } = this.orderForm.value;
        console.log(firstName, lastName, email, productName, quantity);
    }

    private validateEmail(control: Control) {
        return /^\S+@\S+\.\S+$/.test(control.value) ? null : { email: true };
    }
}
