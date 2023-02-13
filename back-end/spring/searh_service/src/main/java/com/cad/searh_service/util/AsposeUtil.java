package com.cad.searh_service.util;

import com.aspose.cad.Image;
import com.aspose.cad.fileformats.cad.CadImage;
import com.aspose.cad.fileformats.cad.cadconsts.CadEntityTypeName;
import com.aspose.cad.fileformats.cad.cadobjects.CadBaseEntity;
import com.aspose.cad.fileformats.cad.cadobjects.CadBlockEntity;
import com.aspose.cad.fileformats.cad.cadobjects.CadMText;
import com.aspose.cad.fileformats.cad.cadobjects.CadText;
import com.aspose.cad.imageoptions.CadRasterizationOptions;
import com.aspose.cad.imageoptions.JpegOptions;
import com.aspose.cad.internal.B.B;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class AsposeUtil {
    private static final String cadDir = System.getProperty("user.home") + "cad" + File.separator;
    private static final String imgDir = System.getProperty("user.home") + "img" + File.separator;

    public Map<String, String[]> getCadInfo(String project) {
        try {
            Map<String, String[]> cadInfo = new HashMap<>();
            Files.walkFileTree(Paths.get(cadDir + project), new SimpleFileVisitor<>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                    if (!Files.isDirectory(file) && file.getFileName().toString().contains(".dwg")) {
                        String title = file.getFileName().toString();
                        String path = file.toAbsolutePath().toString();
                        Set<String> index = extractCadIndex(path);
                        ByteArrayOutputStream stream = convertCadToJpeg(path);
                        cadInfo.put()
                    }
                    return FileVisitResult.CONTINUE;
                }
            });
            return cadInfo;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private ByteArrayOutputStream convertCadToJpeg(String cad) {
        try {
            Image image = Image.load(cad);
            CadRasterizationOptions options = new CadRasterizationOptions();
            options.setPageHeight(200);
            options.setPageWidth(200);

            JpegOptions jpegOptions = new JpegOptions();
            jpegOptions.setVectorRasterizationOptions(options);

            ByteArrayOutputStream stream = new ByteArrayOutputStream();

            ExecutorService executor = Executors.newCachedThreadPool();
            Callable<Object> task = new Callable<Object>() {
                @Override
                public Object call() throws Exception {
                    image.save(stream, jpegOptions);
                    return stream;
                }
            };
            Future<Object> future = executor.submit(task);
            executor.shutdown();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private Set<String> extractCadIndex(String cad) {
        try {
            Set<String> index = new HashSet<>();
            CadImage cadImage = (CadImage) CadImage.load(cad);
            for (CadBlockEntity blockEntity : cadImage.getBlockEntities().getValues()) {
                for (CadBaseEntity entity : blockEntity.getEntities()) {
                    if (entity.getTypeName() == CadEntityTypeName.TEXT) {
                        CadText cadText = (CadText) entity;
                        index.add(filterCadIndex(cadText.getDefaultValue()));
                    }
                    else if (entity.getTypeName() == CadEntityTypeName.MTEXT) {
                        CadMText cadMText = (CadMText) entity;
                        index.add(filterCadIndex(cadMText.getText()));
                    }
                }
            }
            return index;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private String filterCadIndex(String index) {
        String filtered = index.replace(" ", "");
        int numCnt = (int) filtered.chars().filter(c -> c >= '0' && c <= '9').count();
        if (numCnt >= filtered.length() / 2)
            return "";
        return filtered;
    }
}
