package com.cad.searh_service.controller;

import com.cad.searh_service.domain.dto.*;
import com.cad.searh_service.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemeberController {
    private final MemberService memberService;

    @PostMapping("/register")
    public ResponseEntity<MemberRegisterResponse> register(@RequestBody MemberRegisterRequest memeberRegisterRequest) {
        MemberDto memberDto = memberService.register(memeberRegisterRequest);
        return new ResponseEntity<>(new MemberRegisterResponse(memberDto.getEmployName()), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<MemberLoginResponse> login(@RequestBody MemberLoginRequest memberLoginRequest) {
        String token = memberService.login(memberLoginRequest.getEmployNumber(), memberLoginRequest.getPassword());
        return new ResponseEntity<>(new MemberLoginResponse(token), HttpStatus.OK);
    }
}
