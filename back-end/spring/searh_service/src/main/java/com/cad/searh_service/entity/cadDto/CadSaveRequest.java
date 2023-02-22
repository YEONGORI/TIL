package com.cad.searh_service.entity.cadDto;

import com.cad.searh_service.entity.Cad;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class CadSaveRequest {
    private String s3Url;
    private String author;

    public Cad toEntity(String mainCategory, String subCategory, String title, String index, String imgUrl, LocalDateTime createdAt, LocalDateTime updatedAt) {
        return Cad.builder()
                .author(this.author)
                .mainCategory(mainCategory)
                .subCategory(subCategory)
                .title(title)
                .index(index)
                .imgUrl(imgUrl)
                .createdAt(createdAt)
                .updatedAt(updatedAt)
                .build();
    }
}
