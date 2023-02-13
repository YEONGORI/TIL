package com.cad.searh_service.entity.cadDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CadSearchResponse {
    private String author;
    private String mainCategory;
    private String subCategory;
    private String title;
    private String index;
    private String s3Url;
    private String updatedAt;
}
