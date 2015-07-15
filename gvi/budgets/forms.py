from django import forms


    class BudgetForm(forms.Form):
        """
        Form for individual user links
        """
        category = forms.CharField()
        amount = forms.CharField()
        currency = forms.CharField()

