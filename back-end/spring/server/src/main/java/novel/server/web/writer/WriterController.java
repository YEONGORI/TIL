package novel.server.web.writer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import novel.server.domain.writer.Writer;
import novel.server.domain.writer.WriterService;
import novel.server.global.exception.WriterException;
import novel.server.web.writer.dto.WriterRegisterDto;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/api/writer")
@RestController
@RequiredArgsConstructor
public class WriterController {
    private final WriterService writerService;

    @PostMapping("/register")
    public void register(
            @Validated @RequestBody WriterRegisterDto writerRegisterDto,
            BindingResult bindingResult
            ) {
        if (bindingResult.hasErrors()) {
            throw new IllegalArgumentException("필명 또는 비밀번호가 잘못되었습니다.");
        }
        try {
            Writer writer = new Writer(writerRegisterDto.getPenName(), writerRegisterDto.getPassword());
            writerService.register(writer);
        } catch (WriterException e) {
            log.info("Writer 등록 오류 [{}]", e);
        }
    }
}
