from django import forms


    
class BudgetForm(forms.Form):
    category = forms.CharField()
    amount = forms.CharField()
    currency = forms.CharField()

