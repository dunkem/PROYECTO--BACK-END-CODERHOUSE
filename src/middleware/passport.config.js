import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { userManager } from '../dao/user.manager.js'
import { GH_CLIENT_ID, GH_CLIENT_SECRET, GH_CB_URL, SECRET_PASSWORD_JWT, COOKIE_NAME } from '../config/config.js'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

passport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
    let token = null
    if (req && req.signedCookies) {
      token = req.signedCookies[COOKIE_NAME]
    }
    return token
  }]),
  secretOrKey: SECRET_PASSWORD_JWT
}, async (jwt_payload, done) => {
  try {
    done(null, jwt_payload) // payload es el contenido del token, ya descifrado
  } catch (error) {
    done(error)
  }
}))

// Este middleware es para agg el JWT en la cookie
export function autenticacionJwtApi (req, res, next) {
  passport.authenticate('jwt', (error, jwt_payload, info) => {
    if (error || !jwt_payload) return next(error)
    req.user = jwt_payload
    next()
  })(req, res, next)
}

// Este middleware es el que te redirigue en caso de querer acceder sin logearte
export function autenticacionJwtView (req, res, next) {
  passport.authenticate('jwt', (error, jwt_payload) => {
    if (error || !jwt_payload) return res.redirect('/login')
    req.user = jwt_payload
    next()
  })(req, res, next)
}

passport.use('register', new LocalStrategy(
  { passReqToCallback: true, usernameField: 'email' },
  async (req, _u, _p, done) => {
    try {
      const { email, password, age, first_name, last_name, role } = req.body

      const { user } = await userManager.createUser({ email, password, age, first_name, last_name, role })
      done(null, user)
    } catch (err) {
      done(err.message)
    }
  }
))

passport.use('local', new LocalStrategy(
  { usernameField: 'email' },
  async (username, password, done) => {
    try {
      const { user } = await userManager.logUser({ email: username, password })

      done(null, user)
    } catch (err) {
      done(err.message)
    }
  })
)

passport.use('github', new GithubStrategy({
  clientID: GH_CLIENT_ID,
  clientSecret: GH_CLIENT_SECRET,
  callbackURL: GH_CB_URL
}, async (_a, _r, profile, done) => {
  let user

  const search = await userManager.searchGithubUser({ email: profile.username })
  if (search.userExist) {
    user = search.user
  } else {
    const newUser = await userManager.createGithubUser({ email: profile.username })
    user = newUser.user
  }
  done(null, user)
}))

// estos son para cargar en express como middlewares a nivel aplicacion
export const passportInitialize = passport.initialize()

// estos son para cargar como middlewares antes de los controladores correspondientes
export const autenticacionUserRegister = passport.authenticate('register', { failWithError: true, session: false })
export const autenticacionUserLogin = passport.authenticate('local', { failWithError: true, session: false })
export const autenticacionUserGithub = passport.authenticate('github', { scope: ['user:email'], session: false })
export const antenticacionUserGithub_CB = passport.authenticate('github', { failWithError: true, session: false })
