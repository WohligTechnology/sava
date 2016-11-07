global["GoogleKey"] = "AIzaSyBzblvTfnRrpg33LBDzqiMXPqY7dmpwaCk";
global["GoogleclientId"] = "327211732869-f66r7ofqu9v9rmj26ctqr2sbv815a8gb.apps.googleusercontent.com";
global["GoogleclientSecret"] = "KXvTC5XrxwhMEXE9PY3sbrcO";

passport.use(new GoogleStrategy({
        clientId: GoogleclientId,
        clientSecret: GoogleclientSecret,
        callbackURL: global["env"].realHost + "/api/user/loginGoogle",
        accessType: "offline"
    },
    function (accessToken, refreshToken, profile, cb) {
        profile.googleAccessToken = accessToken;
        profile.googleRefreshToken = refreshToken;
        return cb(profile);
    }
));
