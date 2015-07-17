from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout


def app_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        print username, password
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect('accounts:index')

            else:
                # Return a 'disabled account' error message
                return render(request, 'users/login.html', {'error': 'Your account is disabled'})
        else:
            # Return an 'invalid login' error message.
            return render(request, 'users_m/login.html', {'error': 'Incorrect username/password'})
    else:
        return render(request, 'users_m/login.html', {})


def app_logout(request):
    logout(request)
    return redirect('users_m:user_login')
