package novel.server.domain.writer.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import novel.server.domain.writer.Writer;
import novel.server.domain.writer.WriterRepository;
import novel.server.domain.writer.WriterService;
import novel.server.global.exception.WriterException;
import org.springframework.stereotype.Service;


@Transactional
@Service
@RequiredArgsConstructor
public class WriterRegisterService implements WriterService {
    private final WriterRepository writerRepository;

    /**
     * 회원 가입
     * @param writer
     */
    public void register(Writer writer) {
        if (writerRepository.findWriterByPenName(writer.getPenName()).isPresent()) {
            throw new WriterException("중복된 필명 입니다.");
        }
        writerRepository.save(writer);
    }
}
