# otus-best-course-ever
## 1. Технологии
Приложение будет построено на Express, MongoDB, TS.

## 2. Сущности

### Пользователь
```typescript
interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: 'user' | 'author' | 'admin';
    createdAt: Date;
}
```
### Курс
```typescript
interface Course {
    id: string;
    title: string;
    description: string; // Описание курса
    tags: string[]; // Массив тегов
    difficulty: 'beginner' | 'intermediate' | 'advanced'; // Уровень сложности
    authorId: string; // ID автора курса
    files: string[] // наименования файлов
    lessonsId: string[]; // Массив ID занятий
    usersId: string[]; // Массив ID разрешенных пользователей
    createdAt: Date; // Дата создания курса
}
```
### Занятие
```typescript
interface Lesson {
    id: string;
    title: string; // Название занятия
    description: string; // Описание занятия
    videoUrl?: string; // Ссылка на видео (опционально)
    files?: string[]; // Массив ссылок на файлы (опционально)
    links?: string[]; // Массив ссылок (опционально)
    courseId: string; // ID курса
    comments: string[]; // Массив ID комментариев
    ratings: string[]; // Массив ID оценок
    createdAt: Date; // Дата создания занятия
}
```
### Оценка
```typescript
interface Rating {
    userId: string; // ID пользователя
    rating: number; // Оценка (например, от 1 до 5)
}
```

### Тег
```typescript
interface Tags {
    id: id;
    title: string;
}
```

### Тег
```typescript
interface Comment {
    id: id;
    text: string;
    userId: string; // ID автора
    lessonId: string; // ID занятия
    createdAt: Date;
}
```

Связь между сущностями будет осуществляться через ID. C файлами просто по имени файла. Сами файлы будут храниться в папке ./files в корне проекта.

## Эндпоинты
### 1. Пользователи

- **POST /api/auth/register**  
  Регистрация нового пользователя.

- **POST /api/auth/login**  
  Авторизация пользователя.

- **GET /api/users/me**  
  Получение информации о текущем пользователе.

- **PUT /api/users/:id/role**  
  Изменение роли пользователя (`admin`).

---

### 2. Курсы

- **GET /api/courses**  
  Получение списка всех курсов с пагинацией, фильтрацией и сортировкой.

- **POST /api/courses**  
  Создание нового курса `FormData` (`author`, `admin`).

- **GET /api/courses/:id**  
  Получение информации о конкретном курсе.

- **PUT /api/courses/:id**  
  Обновление информации о курсе `FormData` (`author`, `admin`).

- **DELETE /api/courses/:id**  
  Удаление курса (`author`, `admin`).

- **POST /api/courses/:id/add-user**  
  Добавление пользователя в список разрешенных для курса (`author`, `admin`).

---

### 3. Занятия

- **POST /api/lessons**  
  Создание нового занятия `FormData` (`author`, `admin`).

- **GET /api/lessons/:id**  
  Получение информации о конкретном занятии.

- **PUT /api/lessons/:id**  
  Обновление информации о занятии `FormData` (`author`, `admin`).

- **DELETE /api/lessons/:id**  
  Удаление занятия (`author`, `admin`).

- **DELETE /api/lessons/:id/files/:fileId**  
  Удаление файла из занятия (`author`, `admin`).

---

### 4. Оценки

- **POST /api/ratings**  
  Оценка занятия (требуется аутентификация).

- **GET /api/ratings/:lessonId**  
  Получение всех оценок для занятия.

---

### 5. Теги

- **GET /api/tags**  
  Получение списка всех тегов.

- **POST /api/tags**  
  Создание нового тега (`admin`).

- **DELETE /api/tags/:id**  
  Удаление тега (`admin`).

## Коды ответов

- **200** - ок
- **201** - сущность создана
- **401** - Не авторизован
- **403** - Нет доступа
- **404** - Не найдено
- **500** - Ошибка сервера

Часть эндпоинтов будет требовать наличия JWT токена.
Logout будет реализован на фронте, через вычищение информации о пользователе и удалении токена.

## View
Вместо шаблонизатора будет React SPA приложение.

