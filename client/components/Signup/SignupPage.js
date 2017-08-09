import React from 'react';

class SignupPage extends React.component {
    render() {
        return (
    <section class="container">
        <div class="active">
        <div class="row">
            <form class="col s12">
            <div class="row">
                <div class="input-field col s6">
                <i class="material-icons prefix">account_circle</i>
                <input placeholder="Username" id="user_name" type="text" class="validate">
                <!--<label for="user_name">User Name</label>-->
            </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                <i class="material-icons prefix">email</i>
                <input placeholder="Email" id="email" type="email" class="validate">
                <!--<label for="email">Email</label>-->
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                <i class="material-icons prefix">vpn_key</i>
                <input placeholder="Password" id="password" type="password" class="validate">
                <!--<label for="password">Password</label>-->
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                <i class="material-icons prefix">vpn_key</i>
                <input placeholder="Confirm password" id="password" type="password" class="validate">
                <!--<label for="password">Confirm Password</label>-->
                </div>
            </div>
            <button class="btn waves-effect waves-light col s6 red lighten-2" type="submit" name="action">Register
                <i class="material-icons right">send</i>
            </button>
            </form>
        </div>
        </div>
        </section>
        );
    }
}

export default SignupPage;