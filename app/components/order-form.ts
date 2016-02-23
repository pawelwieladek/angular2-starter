import { Component, View } from 'angular2/core';
import { COMMON_DIRECTIVES, FORM_DIRECTIVES, ControlGroup, FormBuilder, Validators, Control } from 'angular2/common';

@Component({
    selector: 'order-form',
    directives: [COMMON_DIRECTIVES, FORM_DIRECTIVES],
    template: `
    <form class="form-horizontal" [ngFormModel]="orderForm" (submit)="submit($event)">
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
    public firstNameControl: Control;
    public lastNameControl: Control;
    public emailControl: Control;
    public productNameControl: Control;
    public quantityControl: Control;

    constructor(private formBuilder: FormBuilder) {
        this.firstNameControl = new Control('', Validators.required);
        this.lastNameControl = new Control('', Validators.required);
        this.emailControl = new Control('', Validators.compose([ Validators.required, OrderFormComponent.validateEmail ]));
        this.productNameControl = new Control('', Validators.required);
        this.quantityControl = new Control(0, Validators.required);
        this.orderForm = formBuilder.group({
            firstName: this.firstNameControl,
            lastName: this.lastNameControl,
            email: this.emailControl,
            productName: this.productNameControl,
            quantity: this.quantityControl
        });
    }

    static validateEmail(control: Control) {
        return /^\S+@\S+\.\S+$/.test(control.value) ? null : { email: true };
    }

    public submit(event) {
        event.preventDefault();
        let { firstName, lastName, email, productName, quantity } = this.orderForm.value;
        console.log(firstName, lastName, email, productName, quantity);
        this.resetForm();
    }

    private resetForm() {
        this.firstNameControl.updateValue('', {});
        this.lastNameControl.updateValue('', {});
        this.emailControl.updateValue('', {});
        this.productNameControl.updateValue('', {});
        this.quantityControl.updateValue(0, {});
    }
}
