---
title: 案例
description: A guide in my new Starlight docs site.
---

这里是中文

## Further reading

- Read [about how-to guides](https://diataxis.fr/how-to-guides/) in the Diátaxis framework


## code hight


asd

```cpp
// vector.h
int a = a + 1;
```

```cpp
    // vector.h
    int a = a + 1;

    class Vector {
    public:
        Vector() = default;
    
    private:
        void    *_ptr{nullptr};
        size_t   _size{0};
    }
```

```diff
    int a = a + 1;

    class Vector {
    public:
-       Vector() = default;
+       Vector() {};
    
    private:
        void    *_ptr{nullptr};
        size_t   _size{0};
    }
```

```bash
// scan.sh
# scan dir
ls anv
```
