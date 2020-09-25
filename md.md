signin 에서 인증된 user 이면,
server 측에서 처리할 것인지?
client 측에서 처리할 것인지?
상의 후 결정하기.


1. session 은 이미 secret 키 사용함.
2. server: 토큰 발급 해서 넣어주는 기능을 만든다.


* jwt 방식!
1. headers 에 넣고,
2. 