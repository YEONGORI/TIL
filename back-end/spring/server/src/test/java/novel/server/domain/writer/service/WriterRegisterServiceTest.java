package novel.server.domain.writer.service;

import novel.server.domain.writer.Writer;
import novel.server.domain.writer.WriterRepository;
import novel.server.domain.writer.WriterService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
class WriterRegisterServiceTest {
    @Autowired
    WriterRepository writerRepository;
    @Autowired
    WriterService writerService;

    @Test
    void 회원가입() {
        String penName = "testPenName";
        String password = "testPassword";
        Writer writer1 = new Writer(penName, password);
        writerRepository.save(writer1);

//        Optional<Writer> writer2 = writerRepository.findWriterByPenName(penName);
//        Assertions.assertThat(writer1).isEqualTo(writer2);
    }
}