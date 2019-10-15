package com.zuitt.two_wheels.controllers;

import com.zuitt.two_wheels.models.Bicycle;
import com.zuitt.two_wheels.models.Category;
import com.zuitt.two_wheels.models.Model;
import com.zuitt.two_wheels.models.Size;
import com.zuitt.two_wheels.repositories.BicycleRepository;
import com.zuitt.two_wheels.repositories.CategoryRepository;
import com.zuitt.two_wheels.repositories.ModelRepository;
import com.zuitt.two_wheels.repositories.SizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/bicycles")
@CrossOrigin(origins = "*")
public class BicycleController {
    @Autowired
    BicycleRepository bicycleRepository;
    @Autowired
    ModelRepository modelRepository;
    @Autowired
    SizeRepository sizeRepository;
    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("/")
    public Iterable<Bicycle> getABicycle() {
        return bicycleRepository.findAll();
    }

    @GetMapping("/{id}")
    public Bicycle getBicycleById(@PathVariable Integer id) {
        return bicycleRepository.findById(id).get();
    }

    @PostMapping("/{category_id}/{model_id}/{size_id}")
    public Bicycle addBicycle(@RequestBody Bicycle bicycle,
                              @PathVariable Integer category_id,
                              @PathVariable Integer model_id,
                              @PathVariable Integer size_id) {
        Category category = categoryRepository.findById(category_id).get();
        Model model = modelRepository.findById(model_id).get();
        Size size = sizeRepository.findById(size_id).get();
        bicycle.setCategory(category);
        bicycle.setModel(model);
        bicycle.setSize(size);
        return bicycleRepository.save(bicycle);
    }

    @PutMapping("/edit-price/{id}/{price}")
    public Bicycle editBikePrice(@PathVariable Integer id, @PathVariable Integer price) {
        Bicycle b = bicycleRepository.findById(id).get();
        b.setPrice(price);
        bicycleRepository.save(b);
        return b;
    }

    @DeleteMapping("/{id}")
    public void deleteBicycle(@PathVariable Integer id) {
        bicycleRepository.deleteById(id);
    }

    private static String UPLOADED_FOLDER = "src/main/resources/static/images/";

    @PostMapping("/upload/{bicycle_id}")
    public String singleFileUpload(@PathVariable Integer bicycle_id,
                                   @RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {

        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", "Please select a file to upload");
            return "error. no image uploaded.";
        }

        try {
            System.out.println(file.getOriginalFilename());
            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);

            Bicycle bicycle = bicycleRepository.findById(bicycle_id).get();
            bicycle.setImage(file.getOriginalFilename());
            bicycleRepository.save(bicycle);

            redirectAttributes.addFlashAttribute("message",
                    "You successfully uploaded '" + file.getOriginalFilename() + "'");

        } catch (IOException e) {
            e.printStackTrace();
        }

        return file.getOriginalFilename();
    }
}
