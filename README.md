# Edutech Backend

Bu loyiha Node.js asosida yozilgan va `watch` rejimida ishlaydi. Barcha kerakli sozlamalar kiritilgan.

## Talablar

- Node.js **v22**
- PostgreSQL (Agar ma'lumotlar bazasidan foydalanilsa)

## O'rnatish

```sh
npm install
```

## Ishga tushirish

```sh
npm run watch
```

# Auth API

Ushbu loyiha autentifikatsiya (Auth) xizmatini ta'minlaydi. Barcha so'rovlar **Bearer Token** orqali autentifikatsiyadan o'tishi kerak, faqat **login** so'rovdan tashqari.

## Talablar
- Node.js **v22**
- PostgreSQL (Agar ma'lumotlar bazasidan foydalanilsa)

## O'rnatish

```sh
npm install
```

## Ishga tushirish

```sh
npm run watch
```

## Migratsiyalarni ishga tushirish

```sh
npm run migration:run
```

## API Endpointlar

### 1. Ro'yxatdan o'tish
**POST** `/auth/register`

- Body:
  ```json
  {
    "full_name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }
  ```

### 2. Login
**POST** `/auth/login`

- Body:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- Response:
  ```json
  {
    "accessToken": "...",
    "refreshToken": "..."
  }
  ```

### 3. Profilni olish
**GET** `/auth/profile`

- Header: `Authorization: Bearer <accessToken>`

### 4. Hisobni o'chirish
**DELETE** `/auth/delete`

- Header: `Authorization: Bearer <accessToken>`

### 5. Tokenlarni yangilash
**POST** `/auth/refresh`

- Body:
  ```json
  {
    "refreshToken": "..."
  }
  ```

### 6. Parolni o'zgartirish
**POST** `/auth/change-password`

- Header: `Authorization: Bearer <accessToken>`
- Body:
  ```json
  {
    "oldPassword": "oldpass123",
    "newPassword": "newpass123"
  }
  ```

# Course API Documentation

## Course Endpoints

### Create Course
- **Endpoint:** `POST /courses`
- **Headers:**
  ```
  Authorization: Bearer {token}
  ```
- **Body:**
  ```json
  {
    "name": "Node.js Basics",
    "description": "Learn the fundamentals of Node.js",
    "teacher_id": "uuid",
    "price": 99.99
  }
  ```
- **Response:**
  ```json
  {
    "id": "uuid",
    "name": "Node.js Basics",
    "description": "Learn the fundamentals of Node.js",
    "teacher_id": "uuid",
    "price": 99.99
  }
  ```

### Get All Courses
- **Endpoint:** `GET /courses`
- **Response:**
  ```json
  [
    {
      "id": "uuid",
      "name": "Node.js Basics",
      "description": "Learn the fundamentals of Node.js",
      "teacher_id": "uuid",
      "price": 99.99
    }
  ]
  ```

### Get Courses with Ratings
- **Endpoint:** `GET /courses/rating`
- **Response:**
  ```json
  [
    {
      "id": "uuid",
      "name": "Node.js Basics",
      "averageRating": 4.5
    }
  ]
  ```

### Get My Courses
- **Endpoint:** `GET /courses/me`
- **Headers:**
  ```
  Authorization: Bearer {token}
  ```
- **Response:**
  ```json
  [
    {
      "id": "uuid",
      "name": "Node.js Basics",
      "description": "Learn the fundamentals of Node.js",
      "teacher_id": "uuid",
      "price": 99.99
    }
  ]
  ```

### Get Course by ID
- **Endpoint:** `GET /courses/{id}`
- **Response:**
  ```json
  {
    "id": "uuid",
    "name": "Node.js Basics",
    "description": "Learn the fundamentals of Node.js",
    "teacher_id": "uuid",
    "price": 99.99
  }
  ```

### Update Course
- **Endpoint:** `PUT /courses/{id}`
- **Headers:**
  ```
  Authorization: Bearer {token}
  ```
- **Body:**
  ```json
  {
    "name": "Advanced Node.js",
    "description": "Master Node.js with advanced concepts",
    "price": 129.99
  }
  ```
- **Response:**
  ```json
  {
    "id": "uuid",
    "name": "Advanced Node.js",
    "description": "Master Node.js with advanced concepts",
    "teacher_id": "uuid",
    "price": 129.99
  }
  ```

### Delete Course
- **Endpoint:** `DELETE /courses/{id}`
- **Headers:**
  ```
  Authorization: Bearer {token}
  ```
- **Response:** `204 No Content`


# Enrollment API Documentation

## Overview
The `Enrollment` API manages student enrollments in courses. It includes functionalities for creating, retrieving, updating, and deleting enrollments.

## Endpoints

### Create Enrollment
**Endpoint:** `POST /enrollments/`

**Description:** Creates a new enrollment for a student.

**Authorization:** Requires `student` role.

**Request Body:**
```json
{
  "course_id": "uuid",
  "status": "PENDING | ACTIVE | COMPLETED | CANCELED"
}
```

**Response:**
```json
{
  "id": "uuid",
  "student_id": "uuid",
  "course_id": "uuid",
  "status": "PENDING",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Get All Enrollments
**Endpoint:** `GET /enrollments/`

**Description:** Retrieves all enrollments.

**Authorization:** Requires `teacher` or `admin` role.

**Response:**
```json
[
  {
    "id": "uuid",
    "student_id": "uuid",
    "course_id": "uuid",
    "status": "ACTIVE",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
]
```

### Get Enrollments for Logged-in Student
**Endpoint:** `GET /enrollments/my`

**Description:** Retrieves enrollments for the authenticated student.

**Authorization:** Requires `student` role.

**Response:**
```json
[
  {
    "id": "uuid",
    "course_id": "uuid",
    "status": "ACTIVE"
  }
]
```

### Get Enrollments by Course
**Endpoint:** `GET /enrollments/course/:id`

**Description:** Retrieves enrollments for a specific course.

**Response:**
```json
[
  {
    "id": "uuid",
    "student_id": "uuid",
    "status": "ACTIVE"
  }
]
```

### Get Enrollment by ID
**Endpoint:** `GET /enrollments/:id`

**Description:** Retrieves a single enrollment by ID.

**Response:**
```json
{
  "id": "uuid",
  "student_id": "uuid",
  "course_id": "uuid",
  "status": "ACTIVE",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Enrollment Status Enum
```ts
export enum EnrollmentStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}
```


# Lesson API Documentation

## Endpoints

### Create Lesson
**POST** `/lessons/`

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Body:
```json
{
  "title": "Introduction to Node.js",
  "course_id": "12345",
  "number": 1
}
```

#### Response:
```json
{
  "id": "67890",
  "title": "Introduction to Node.js",
  "course_id": "12345",
  "number": 1,
  "homeworks": [],
  "contents": []
}
```

---

### Get All Lessons
**GET** `/lessons/`

#### Response:
```json
[
  {
    "id": "67890",
    "title": "Introduction to Node.js",
    "course_id": "12345",
    "number": 1,
    "homeworks": [],
    "contents": []
  }
]
```

---

### Get Lesson by ID
**GET** `/lessons/{id}`

#### Response:
```json
{
  "id": "67890",
  "title": "Introduction to Node.js",
  "course_id": "12345",
  "number": 1,
  "homeworks": [],
  "contents": []
}
```

---

### Update Lesson
**PUT** `/lessons/{id}`

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Body:
```json
{
  "title": "Advanced Node.js",
  "course_id": "12345",
  "number": 2
}
```

#### Response:
```json
{
  "id": "67890",
  "title": "Advanced Node.js",
  "course_id": "12345",
  "number": 2,
  "homeworks": [],
  "contents": []
}
```

---

### Delete Lesson
**DELETE** `/lessons/{id}`

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Response:
```json
{
  "message": "Lesson deleted successfully"
}
```

# Payment API

## Endpoints

### 1. Create Payment
**POST** `/payments`

#### Request Body:
```json
{
  "course_id": "string",
  "amount": 100,
  "status": "PENDING"
}
```

#### Response:
```json
{
  "id": "string",
  "course_id": "string",
  "amount": 100,
  "status": "PENDING",
  "student_id": "string"
}
```

### 2. Get All Payments
**GET** `/payments`

#### Response:
```json
[
  {
    "id": "string",
    "course_id": "string",
    "amount": 100,
    "status": "COMPLETED",
    "student": {
      "id": "string",
      "name": "John Doe"
    },
    "course": {
      "id": "string",
      "title": "Course Title"
    }
  }
]
```

### 3. Get Payment by ID
**GET** `/payments/{id}`

#### Response:
```json
{
  "id": "string",
  "course_id": "string",
  "amount": 100,
  "status": "FAILED",
  "student": {
    "id": "string",
    "name": "John Doe"
  },
  "course": {
    "id": "string",
    "title": "Course Title"
  }
}
```

### 4. Get Payments by Student
**GET** `/payments/student`

#### Response:
```json
[
  {
    "id": "string",
    "course_id": "string",
    "amount": 100,
    "status": "COMPLETED",
    "course": {
      "id": "string",
      "title": "Course Title"
    }
  }
]
```

### 5. Update Payment
**PUT** `/payments/{id}`

#### Request Body:
```json
{
  "status": "COMPLETED"
}
```

#### Response:
```json
{
  "id": "string",
  "course_id": "string",
  "amount": 100,
  "status": "COMPLETED",
  "student_id": "string"
}
```

### 6. Delete Payment
**DELETE** `/payments/{id}`

#### Response:
```
204 No Content
```

# Progress Management API

Bu hujjatda progressni boshqarish uchun `ProgressService` va `ProgressController` haqida batafsil ma'lumot beriladi.

## **Endpoints**

### **1. Progress yaratish**
**POST** `/progress`
- **Body:**
  ```json
  {
    "lesson_id": "lesson-id",
    "status": "IN_PROGRESS"
  }
  ```
- **Response:**
  ```json
  {
    "id": "progress-id",
    "lesson_id": "lesson-id",
    "status": "IN_PROGRESS",
    "student_id": "student-id"
  }
  ```

### **2. Barcha progresslarni olish**
**GET** `/progress`
- **Response:**
  ```json
  [
    {
      "id": "progress-id",
      "lesson_id": "lesson-id",
      "status": "COMPLETED",
      "student_id": "student-id"
    }
  ]
  ```

### **3. Progressni ID orqali olish**
**GET** `/progress/:id`
- **Response:**
  ```json
  {
    "id": "progress-id",
    "lesson_id": "lesson-id",
    "status": "IN_PROGRESS",
    "student_id": "student-id"
  }
  ```

### **4. Talabaning progressini olish**
**GET** `/progress/student/:id`
- **Response:**
  ```json
  [
    {
      "courseId": "course-id",
      "courseName": "Mathematics",
      "totalLessons": 10,
      "completedLessons": 5,
      "completionPercentage": 50.0
    }
  ]
  ```

### **5. Progressni yangilash**
**PUT** `/progress/:id`
- **Body:**
  ```json
  {
    "status": "COMPLETED"
  }
  ```
- **Response:**
  ```json
  {
    "id": "progress-id",
    "lesson_id": "lesson-id",
    "status": "COMPLETED",
    "student_id": "student-id"
  }
  ```

### **6. Progressni o‘chirish**
**DELETE** `/progress/:id`
- **Response:**
  ```json
  {
    "message": "Progress deleted successfully"
  }
  ```

## **Status turlari**
- `NOT_STARTED` - Boshlanmagan
- `IN_PROGRESS` - Davom etmoqda
- `COMPLETED` - Tugatilgan

# Rating API Documentation

## Overview
The `Rating API` allows users to create, retrieve, update, and delete course ratings. Each rating is associated with a course and submitted by a student.

## Endpoints

### Create a Rating
**Endpoint:** `POST /ratings`

**Description:** Creates a new rating for a course.

**Request Body:**
```json
{
  "course_id": "string",
  "rating": 5,
  "comment": "Optional string"
}
```

**Response:**
```json
{
  "id": "string",
  "course_id": "string",
  "rating": 5,
  "comment": "Optional string",
  "student_id": "string"
}
```

---

### Get Ratings by Course
**Endpoint:** `GET /ratings/course/:id`

**Description:** Retrieves all ratings for a specific course.

**Response:**
```json
[
  {
    "id": "string",
    "course_id": "string",
    "rating": 5,
    "comment": "Optional string",
    "student_id": "string"
  }
]
```

---

### Get Rating by ID
**Endpoint:** `GET /ratings/:id`

**Description:** Retrieves a rating by its ID.

**Response:**
```json
{
  "id": "string",
  "course_id": "string",
  "rating": 5,
  "comment": "Optional string",
  "student_id": "string"
}
```

**Errors:**
- `404 Not Found`: If the rating does not exist.

---

### Update a Rating
**Endpoint:** `PUT /ratings/:id`

**Description:** Updates an existing rating.

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Updated comment"
}
```

**Response:**
```json
{
  "id": "string",
  "course_id": "string",
  "rating": 4,
  "comment": "Updated comment",
  "student_id": "string"
}
```

---

### Delete a Rating
**Endpoint:** `DELETE /ratings/:id`

**Description:** Deletes a rating by its ID.

**Response:**
- `204 No Content` if successful.
- `404 Not Found` if the rating does not exist.

## Error Handling
- `400 Bad Request`: Invalid input data.
- `404 Not Found`: Requested resource not found.
- `500 Internal Server Error`: Unexpected error occurred on the server.

## Data Model
```ts
export interface IRatingDto {
  course_id: string;
  rating: number;
  comment?: string;
}
```

## Notes
- Ratings are stored in the database along with `student_id` for tracking.
- Ratings should be between 1 and 5.
- The API follows RESTful conventions.



