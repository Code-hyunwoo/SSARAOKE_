package com.ssafy.api.user.service;

import com.ssafy.domain.user.entity.User;

public interface UserService {
    String updateUserNickname(User user, String nickname);

}
