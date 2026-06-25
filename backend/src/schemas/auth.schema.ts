import { z } from 'zod';

export const signupSchema = z.object({
    body: z.object({
        firstName: z.string().min(2, 'Name is too short'),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
        email: z.string().email(),
        country: z.string('Country is required'),
        mobileNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid mobile number format (e.g. +1234567890)'),
        dateOfBirth: z.string().date(),
        username: z.string(),
        password: z.string(),
        gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
            error: (issue) =>
                issue.input === undefined
                    ? 'Gender is required'
                    : 'Gender must be MALE, FEMALE, or OTHER'
        }),
        role: z.enum(['SUPERADMIN', 'ADMIN', 'EXAMINER', 'EXAMINEE'], {
            error: (issue) =>
                issue.input === undefined
                    ? 'Role is required'
                    : 'Role must be SUPERADMIN, ADMIN, EXAMINER, or EXAMINEE'
        })
    })
});

export const signinSchema = z.object({
    body: z.object({
        username: z.string(),
        password: z.string()
    })
});