package org.domeos.framework.api.mapper.file;

import org.apache.ibatis.annotations.*;
import org.domeos.framework.api.model.file.ByteContent;
import org.domeos.framework.api.model.file.FileContent;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by baokangwang on 2016/4/6.
 */
@Repository
public interface FileContentMapper {

    @Insert("INSERT INTO file_content (name, state, md5, content) values (#{name}, #{state}, #{md5}, #{content})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    void insertFileContent(FileContent fileContent);

    @Select("SELECT content FROM file_content WHERE md5=#{md5}")
    List<FileContent> getContentByMd5(@Param("md5") String md5);
}