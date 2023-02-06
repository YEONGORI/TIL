package com.cad.searh_service.entity.memberDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MemberLoginRequest {
    private String employNumber;
    private String password;
}
