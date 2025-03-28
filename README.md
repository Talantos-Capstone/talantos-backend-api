# Talantos API

## Install

Clone repo, then run:

```bash
npm install
```

## Data Model


### Tables:
- **USERS** : Represents the users in the system.
    - `U_USER_ID`: Unique ID for the user.
    - `U_EMAIL`: Email address.
    - `U_PASSWORD`: User's password.
    - `U_ROLE`: User role (e.g., Tutor, Analyst, Admin, User).
    - `U_CREATED_AT`: Account creation timestamp.
    - `U_UPDATED_AT`: Last update timestamp.
    - `U_PHONE_NUMBER`: Phone number.
    - `U_ADDRESS_1`, U_ADDRESS_2: Address details.
    - `U_DATE_OF_BIRTH`: Date of birth.
    - `U_FIRST_NAME`, U_LAST_NAME: Name details.
    - `U_IS_VALID`: Whether the user is valid.
- **ATHLETES** : Represents athlete details.
    - `A_ATHLETE_ID`: Unique athlete ID.
    - `A_HEIGHT`: Athlete's height.
    - `A_WEIGHT`: Athlete's weight.
    - `A_DATE_BIRTH`: Birthdate.
    - `A_SCHOOL_GRADE`: School grade.
    - `A_SCHOOL_GPA`: School GPA.
    - `A_BIO`: Athlete biography.
- **ATHLETE_SPORTS** : Represents sports associated with athletes.
    - `ASP_ATHLETE_SPORTS_ID`: Unique ID.
    - `ASP_SPORTS_NAME`: Name of the sport.
    - `ASP_ATHLETE_SPORT_INFO`: Additional sport-related info.
- **COMPETITIONS** : Represents competitions athletes can participate in.
    - `C_COMPETITION_ID`: Unique competition ID.
    - `C_COMPETITION_NAME`: Competition name.
    - `C_EVENT_DATE`: Date of the event.
    - `C_LOCATION`: Event location.
    - `C_ORGANIZER`: Competition organizer.
    - `C_DESCRIPTION`: Description of the competition.
    - `C_IS_ACTIVE`: Whether the competition is active.
- **ATHLETE_COMPETITIONS** : Represents the relationship between athletes and competitions.
    - `AC_ATHLETE_COMPETITION_ID`: Unique ID.
    - `AC_ATHLETE_ID`: Athlete ID.
    - `AC_COMPETITION_ID`: Competition ID.
    - `AC_PERFORMANCE_METRICS`: Athlete's performance data.
    - `AC_RESULTS`: Results of the competition.
    - `AC_CREATED_AT`: Record creation timestamp.
    - `AC_UPDATED_AT`: Last update timestamp.
- **USER_SEARCH_FILTER** : Represents search filters applied by users.
    - `USF_SEARCH_FILTER_ID`: Unique filter ID.
    - `USF_USER_ID`: User ID.
    - `USF_PRIVILEDGE`: User role (e.g., Tutor, Analyst).
    - `USF_SEARCH_PARAMS`: Filter search parameters.
- **ADMINS** : Represents admin users in the system.
    - `AM_ADMIN_ID`: Unique admin ID.
    - `AM_USER_ID`: Associated user ID.
    - `AM_EMPLOYEE_ID`: Employee ID.
    - `AM_ACCESS_LEVEL`: Admin access level.
    - `AM_JOB_TITLE`: Job title.
    - `AM_CREATED_AT`: Record creation timestamp.
    - `AM_UPDATED_AT`: Last update timestamp.
- **ADMIN_REPORTS** : Represents reports generated by admins for user profiles.
    - `AR_ADMIN_REPORT_ID`: Unique report ID.
    - `AR_REPORTED_USER_ID`: Reported user ID.
    - `AR_CHECKED_BY_ADMIN_ID`: Admin who checked the report.
    - `AR_IS_PROFILE_VALID`, `AR_IS_METRICS_VALID`, `AR_IS_DOCS_VALID`: Validity checks for the profile, metrics, and documents.
- **TUTORS** : Represents tutor users in the system.
    - `T_TUTOR_ID`: Unique tutor ID.
    - `T_USER_ID`: Associated user ID.
    - `T_UNIVERSITY`: University associated with the tutor.
    - `T_POSITION`: Tutor's position.
    - `T_IS_VERIFIED`: Whether the tutor is verified.
- **ANALYSTS** : Represents analyst users in the system.
    - `AN_ANALYST_ID`: Unique analyst ID.
    - `AN_USER_ID`: Associated user ID.
    - `AN_IS_VERIFIED`: Whether the analyst is verified.
    - `AN_CREATED_AT`: Record creation timestamp.
    - `AN_UPDATED_AT`: Last update timestamp.
- **EVALUATIONS** : Represents evaluations of athletes by analysts.
    - `EV_EVALUATION_ID`: Unique evaluation ID.
    - `EV_ATHLETE_ID`: Athlete ID.
    - `EV_ANALYST_ID`: Analyst ID.
    - `EV_IS_METRICS_VALID`: Whether the metrics are valid.
    - `EV_METRICS`: Evaluation metrics.
    - `EV_EVALUATION_DATE`: Evaluation date.
- **CONTACT_REQUESTS** : Represents contact requests made by recruiters to athletes or analysts.
    - `CR_REQUEST_ID`: Unique request ID.
    - `CR_RECRUITER_ID`: Recruiter ID.
    - `CR_ATHLETE_ID`: Athlete ID.
    - `CR_ANALYSTS_ID`: Analyst ID.
    - `CR_STATUS`: Status of the request (e.g., Pending, Accepted).
    - `CR_REQUESTED_AT`: Request creation timestamp.
    - `CR_MESSAGE`: Message content.
- **APPROVED_CHANGES** : Represents approved changes to user information.
    - `ACC_ID`: Unique change ID.
    - `ACC_APPROVED_BY`: Admin who approved the change.
    - `ACC_CHANGE_BY`: User who made the change.
    - `ACC_CHANGE_TO`: The field that was changed.
    - `ACC_CREATION_DATE`: Change creation timestamp.
    - `ACC_APPROVED_DATE`: Approval timestamp.
    - `ACC_MODIFICATIONS`: Detailed changes made.
    - `ACC_TIMEOUT`: Whether the change has timed out.

### Enums
- **BaseUserRole** : Represents the possible roles for users.
    - `TUTOR`
    - `ANALYIST`
    - `ADMIN`
    - `USER`
- **BaseStatus** : Represents the possible statuses for contact requests.
    - `PENDING`
    - `ACCEPTED`
    - `REJECTED`
    - `IN_PROGRESS`
    - `COMPLETED`
    - `CANCELED`

## Tech Stack

- Backend:
  - PostgreSQL
  - Node.js
  - Prisma
  - TypeScript
  - Jest