@extends('backend.main')

@section('content')
<div class="row">
    <div class="col-xl-10 offset-xl-1">
        <div class="card my_card">
            <div class="card-header bg-transparent">
                <a href="{{route('banner')}}" class="card-title mb-0 d-inline-flex align-items-center create_title">
                    <i class=" ri-arrow-left-s-line mr-3 primary-icon"></i>
                    <span class="create_sub_title">Banner ပြုပြင်မည်</span>
                </a>
            </div><!-- end card header -->
            <div class="card-body">
                <div class="row d-flex justify-content-center">
                    <div class="col-xl-9">
                        <form method="POST" action="{{route('banner.update', $banner->id)}}" enctype="multipart/form-data" id="banner_create">
                            @csrf
                            <div class="upload mb-3">
                                <div class="preview_img">
                                    <img src="{{ $banner->image ?? asset(config('app.companyInfo.logo')) }}" width="30%" alt="">
                                </div>
                                <div class="round">
                                  <input type="file" id="upload_img" name="image" class="form-control mt-2">
                                  <i class ="ri-camera-fill" style = "color: #fff;"></i>
                                </div>
                            </div>

                            <div class="text-end submit-m-btn">
                                <button type="submit" class="btn btn-primary submit-btn">ပြုပြင်မည်</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('script')

    <script>
         $(document).ready(function() {
             $('#upload_img').on('change', function() {
                 let file_length = document.getElementById('upload_img').files.length;
                 if(file_length > 0) {
                     $('.preview_img').html('');
                     for(i = 0; i < file_length ; i++) {
                         $('.preview_img').html('');
                         $('.preview_img').append(`<img src="${URL.createObjectURL(event.target.files[i])}" width="30%" />`)
                     }
                 } else {
                     $('.preview_img').html(`<img src="{{ asset(config('app.companyInfo.logo')) }}" width="30%" alt="">`);
                 }
             })
         })
    </script>
@endsection
