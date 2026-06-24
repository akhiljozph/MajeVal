# MajeVal

## About the product
MajeVal is a project where an examiner can add a questionnaire for an examinee to answer. MajeVal uses RBAC for each modules. MajeVal has two different role and a super admin user. Super admin will manage all users of MajeVal and it will a preconfigured one.

## Roles
- Examiner
- Examinee

## Modules
- Dashboard (Examiner)
- Questionnaire (Examiner)
- Exams (Examinee)
- Profile (Examiner & Examinee)

## Techincal Stack
- Frontend
    - Angular (V22.0.0) with SSR & SSG
        - Reactive forms
        - Signal forms
        - Interceptor
    - RxJS
        - `retry()`
- Backend
    - Express.js
    - Inversify.js
    - Zod
    - Helmet
    - Nodemailer
    - Express-rate-limiter
    - Cors
    - Nodemon
    - Opentelemetry
- DB
    - MongoDB
    - ORM - Mongoose