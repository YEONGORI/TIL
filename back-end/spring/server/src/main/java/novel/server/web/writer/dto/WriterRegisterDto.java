package novel.server.web.writer.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

@Getter
@ToString
@AllArgsConstructor
public class WriterRegisterDto {
    @NotEmpty
    @Length(max = 30)
    private String penName;

    @NotEmpty
    @Length(max = 100)
    private String password;
}
