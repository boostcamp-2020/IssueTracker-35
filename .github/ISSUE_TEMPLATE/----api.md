---
name: 백엔드 API
about: 구현할 API를 명세
title: "[API] "
labels: "\U0001F6E2 BE, \U0001F579 API"
assignees: ''

---

## 개요
- 로그인 처리 API

## URL
- `/users/login`

## Method
- `POST`: `로그인을 처리하고 토큰 발급`

## Query parameters
- `key`: `value`

## Header
- `Authorization`: `token`

## Body
- `username`: `string`
- `password`: `string`

## Response
- `token`: `string`
- `code`: `int`

## Error
| 상태 코드  | 오류 메시지  | 설명 |
|:-----:|:------:|:-----:|
| 400 | Missing username or password. | 아이디 혹은 비밀번호 누락 시 발생합니다. |
|   |    |   |    |
